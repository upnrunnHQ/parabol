import styled from '@emotion/styled'
import React, {ReactNode} from 'react'
import {PALETTE} from '../styles/paletteV2'

const StyledLink = styled('a')({
  color: PALETTE.LINK_BLUE,
  display: 'flex',
  fontSize: 12,
  lineHeight: '20px',
  textDecoration: 'none'
})

interface Props {
  className?: string
  dataCy?: string
  cloudName: string
  issueKey: string
  projectKey: string
  children?: ReactNode
}

const PokerEstimateJiraIssueLink = (props: Props) => {
  const {dataCy, className, cloudName, issueKey, projectKey, children} = props
  const href =
    cloudName === 'jira-demo'
      ? 'https://www.parabol.co/features/integrations'
      : `https://${cloudName}.atlassian.net/browse/${issueKey}`
  return (
    <StyledLink
      className={className}
      data-cy={dataCy}
      href={href}
      rel='noopener noreferrer'
      target='_blank'
      title={`Jira Issue #${issueKey} on ${projectKey}`}
    >
      {`${issueKey}`}
      {children}
    </StyledLink>
  )
}

export default PokerEstimateJiraIssueLink
