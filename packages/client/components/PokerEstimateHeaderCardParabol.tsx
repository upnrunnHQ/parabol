import React from 'react'
import {createFragmentContainer} from 'react-relay'
import graphql from 'babel-plugin-relay/macro'
import {PokerEstimateHeaderCardParabol_stage} from '../__generated__/PokerEstimateHeaderCardParabol_stage.graphql'
import styled from '@emotion/styled'
import CardButton from './CardButton'
import IconLabel from './IconLabel'
import {PALETTE} from '~/styles/paletteV2'
import {Elevation} from '~/styles/elevation'
import useTaskChild from '~/hooks/useTaskChildFocus'
import TaskFooterIntegrateToggle from '../modules/outcomeCard/components/OutcomeCardFooter/TaskFooterIntegrateToggle'
import useMutationProps from '~/hooks/useMutationProps'
import TaskIntegrationLink from '~/components/TaskIntegrationLink'
import Icon from './Icon'
import {ICON_SIZE} from '../styles/typographyV2'
import getTaskTitle from '~/utils/getTaskTitle'

const HeaderCardWrapper = styled('div')({
  display: 'flex',
  padding: '4px 24px'
})

const HeaderCard = styled('div')({
  background: PALETTE.CONTROL_LIGHT,
  borderRadius: '4px',
  boxShadow: Elevation.Z3,
  padding: '12px 16px',
  maxWidth: 1000,
  width: '55%'
})

const CardTitle = styled('h1')({
  fontSize: 16,
  lineHeight: '24px',
  margin: 0
})

const CardIcons = styled('div')({
  display: 'flex'
})

const CardTitleWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
})

const StyledTaskIntegrationLink = styled(TaskIntegrationLink)({
  color: PALETTE.LINK_BLUE,
  display: 'flex',
  fontSize: 12,
  lineHeight: '20px',
  textDecoration: 'none',
  padding: '0 0',
  '&:hover,:focus': {
    textDecoration: 'none'
  }
})

const StyledIcon = styled(Icon)({
  fontSize: ICON_SIZE.MD18,
  paddingLeft: 4
})

const IntegrationToggleWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%'
})

interface Props {
  stage: PokerEstimateHeaderCardParabol_stage
}

const PokerEstimateHeaderCardParabol = (props: Props) => {
  const {stage} = props
  const {story: task} = stage
  const {plaintextContent, integration} = task
  const {onCompleted, onError, submitMutation, submitting} = useMutationProps()
  const mutationProps = {
    onCompleted,
    onError,
    submitMutation,
    submitting
  }
  const title = getTaskTitle(plaintextContent!)

  return (
    <>
      <HeaderCardWrapper>
        <HeaderCard>
          <CardTitleWrapper>
            <CardTitle>{title}</CardTitle>
            <CardIcons>
              <CardButton>
                <IconLabel icon='unfold_more' onClick={() => console.log('click')} />
              </CardButton>
            </CardIcons>
          </CardTitleWrapper>
          <div>description</div>
          <StyledTaskIntegrationLink
            dataCy={`task`}
            integration={integration || null}
            jiraLabelPrefix={false}
          >
            <StyledIcon>launch</StyledIcon>
          </StyledTaskIntegrationLink>
          <IntegrationToggleWrapper>
            {!integration && 
            <TaskFooterIntegrateToggle
              dataCy={`task-integration`}
              mutationProps={mutationProps}
              task={task}
              useTaskChild={useTaskChild}
            />
            }
          </IntegrationToggleWrapper>
        </HeaderCard>
      </HeaderCardWrapper>
    </>
  )
}

export default createFragmentContainer(
  PokerEstimateHeaderCardParabol,
  {
    stage: graphql`
    fragment PokerEstimateHeaderCardParabol_stage on EstimateStage {
      story {
        ...on Task {
          integration {
            service
            ...TaskIntegrationLink_integration
          }
          plaintextContent
          content
          ...TaskFooterIntegrateMenuRoot_task
        }
      }
    }
    `
  }
)
