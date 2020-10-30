import styled from '@emotion/styled'
import graphql from 'babel-plugin-relay/macro'
import React from 'react'
import {createFragmentContainer} from 'react-relay'
import {phaseLabelLookup} from '../utils/meetings/lookups'
import {PokerEstimatePhase_meeting} from '../__generated__/PokerEstimatePhase_meeting.graphql'
import EstimatePhaseArea from './EstimatePhaseArea'
import EstimatePhaseDiscussionDrawer from './EstimatePhaseDiscussionDrawer'
import MeetingContent from './MeetingContent'
import MeetingHeaderAndPhase from './MeetingHeaderAndPhase'
import MeetingTopBar from './MeetingTopBar'
import PhaseHeaderDescription from './PhaseHeaderDescription'
import PhaseHeaderTitle from './PhaseHeaderTitle'
import PhaseWrapper from './PhaseWrapper'
import PokerEstimateHeaderCardJira from './PokerEstimateHeaderCardJira'
import defaultUserAvatar from '../styles/theme/images/avatar-user.svg'
import {PokerMeetingPhaseProps} from './PokerMeeting'
import Avatar from './Avatar/Avatar'
import {Breakpoint} from '~/types/constEnums'
import useBreakpoint from '~/hooks/useBreakpoint'
import useSidebar from '~/hooks/useSidebar'
interface Props extends PokerMeetingPhaseProps {
  meeting: PokerEstimatePhase_meeting
}

const MeetingTopBarWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
})

const AvatarBlock = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 8px 8px 0'
})

const PokerEstimatePhase = (props: Props) => {
  const {avatarGroup, toggleSidebar, meeting} = props
  const {id: meetingId, localStage, endedAt, showSidebar} = meeting
  const isDesktop = useBreakpoint(Breakpoint.NEW_MEETING_GRID)
  const {isOpen: isDrawerOpen, toggle: toggleDrawer} = useSidebar()
  if (!localStage) return null
  const {__typename} = localStage
  const storyId = localStage.__id!
  return (
    <MeetingContent>
      <MeetingHeaderAndPhase hideBottomBar={!!endedAt}>
        <MeetingTopBarWrapper>
          <div style={{width: '100%'}}>
            <MeetingTopBar
              avatarGroup={avatarGroup}
              isMeetingSidebarCollapsed={!showSidebar}
              toggleSidebar={toggleSidebar}
            >
              <PhaseHeaderTitle>{phaseLabelLookup.ESTIMATE}</PhaseHeaderTitle>
              <PhaseHeaderDescription>{'Estimate each story as a team'}</PhaseHeaderDescription>
            </MeetingTopBar>
          </div>
          {!isDesktop && (
            <AvatarBlock onClick={toggleDrawer}>
              <Avatar hasBadge={false} picture={defaultUserAvatar} size={48} />
            </AvatarBlock>
          )}
        </MeetingTopBarWrapper>
        {__typename === 'EstimateStageJira' && (
          <PokerEstimateHeaderCardJira stage={localStage as any} />
        )}
        <PhaseWrapper>
          <EstimatePhaseArea />
        </PhaseWrapper>
      </MeetingHeaderAndPhase>
      <EstimatePhaseDiscussionDrawer
        isDesktop={isDesktop}
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        storyId={storyId}
        meetingId={meetingId}
      />
    </MeetingContent>
  )
}

graphql`
  fragment PokerEstimatePhaseStage on EstimateStage {
    ... on EstimateStageJira {
      __typename
      ...PokerEstimateHeaderCardJira_stage
    }
  }
`
export default createFragmentContainer(PokerEstimatePhase, {
  meeting: graphql`
    fragment PokerEstimatePhase_meeting on PokerMeeting {
      id
      endedAt
      showSidebar
      localStage {
        ...PokerEstimatePhaseStage @relay(mask: false)
      }
      phases {
        ... on EstimatePhase {
          stages {
            ...PokerEstimatePhaseStage @relay(mask: false)
          }
        }
      }
    }
  `
})
