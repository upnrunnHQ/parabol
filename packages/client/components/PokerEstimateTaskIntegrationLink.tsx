import styled from '@emotion/styled'
import graphql from 'babel-plugin-relay/macro'
import React, {ReactNode} from 'react'
import {createFragmentContainer} from 'react-relay'
import {PALETTE} from '../styles/paletteV2'
import {TaskServiceEnum} from '../types/graphql'
import {TaskIntegrationLinkIntegrationJira} from '../__generated__/TaskIntegrationLinkIntegrationJira.graphql'
import {PokerEstimateTaskIntegrationLink_integration} from '../__generated__/PokerEstimateTaskIntegrationLink_integration.graphql'
import PokerEstimateJiraIssueLink from './PokerEstimateJiraIssueLink'

const StyledLink = styled('a')({
  color: PALETTE.LINK_BLUE,
  display: 'flex',
  fontSize: 12,
  lineHeight: '20px',
  textDecoration: 'none'
})

interface Props {
  integration: PokerEstimateTaskIntegrationLink_integration | null
  dataCy: string
  children?: ReactNode
}

const PokerEstimateTaskIntegrationLink = (props: Props) => {
  const {integration, dataCy, children} = props
  if (!integration) return null
  const {service} = integration
  if (service === TaskServiceEnum.jira) {
    const {issueKey, projectKey, cloudName} = integration as unknown as TaskIntegrationLinkIntegrationJira
    return (
      <PokerEstimateJiraIssueLink
        dataCy={`${dataCy}-jira-issue-link`}
        issueKey={issueKey}
        projectKey={projectKey}
        cloudName={cloudName}
      >
        {children}
      </PokerEstimateJiraIssueLink>
    )
  } else if (service === TaskServiceEnum.github) {
    const {nameWithOwner, issueNumber} = integration
    const href =
      nameWithOwner === 'ParabolInc/ParabolDemo'
        ? 'https://github.com/ParabolInc/parabol'
        : `https://www.github.com/${nameWithOwner}/issues/${issueNumber}`
    return (
      <StyledLink
        href={href}
        rel='noopener noreferrer'
        target='_blank'
        title={`GitHub Issue #${issueNumber} on ${nameWithOwner}`}
      >
        {`Issue #${issueNumber}`}
        {children}
      </StyledLink>
    )
  }
  return null
}

export default createFragmentContainer(PokerEstimateTaskIntegrationLink, {
  integration: graphql`
    fragment PokerEstimateTaskIntegrationLink_integration on TaskIntegration {
      service
      ...TaskIntegrationLinkIntegrationGitHub @relay(mask: false)
      ...TaskIntegrationLinkIntegrationJira @relay(mask: false)
    }
  `
})
