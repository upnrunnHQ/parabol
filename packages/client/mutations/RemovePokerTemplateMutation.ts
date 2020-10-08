import graphql from 'babel-plugin-relay/macro'
import {commitMutation} from 'react-relay'
import {IPokerTemplate, MeetingTypeEnum} from '../types/graphql'
import {SharedUpdater, StandardMutation} from '../types/relayMutations'
import getInProxy from '../utils/relay/getInProxy'
import {RemovePokerTemplateMutation as TRemovePokerTemplateMutation} from '../__generated__/RemovePokerTemplateMutation.graphql'
import {RemovePokerTemplateMutation_team} from '../__generated__/RemovePokerTemplateMutation_team.graphql'
import handleRemoveTemplate from './handlers/handleRemoveTemplate'

graphql`
  fragment RemovePokerTemplateMutation_team on RemovePokerTemplatePayload {
    pokerTemplate {
      id
      teamId
    }
    pokerMeetingSettings {
      selectedTemplateId
      selectedTemplate {
        id
      }
    }
  }
`

const mutation = graphql`
  mutation RemovePokerTemplateMutation($templateId: ID!) {
    removePokerTemplate(templateId: $templateId) {
      ...RemovePokerTemplateMutation_team @relay(mask: false)
    }
  }
`

export const removePokerTemplateTeamUpdater: SharedUpdater<RemovePokerTemplateMutation_team> = (
  payload,
  {store}
) => {
  const templateId = getInProxy(payload, 'pokerTemplate', 'id')
  const teamId = getInProxy(payload, 'pokerTemplate', 'teamId')
  handleRemoveTemplate(templateId, teamId, store, MeetingTypeEnum.poker)
}

const RemovePokerTemplateMutation: StandardMutation<TRemovePokerTemplateMutation> = (
  atmosphere,
  variables,
  {onError, onCompleted}
) => {
  return commitMutation<TRemovePokerTemplateMutation>(atmosphere, {
    mutation,
    variables,
    onCompleted,
    onError,
    updater: (store) => {
      const payload = store.getRootField('removePokerTemplate')
      if (!payload) return
      removePokerTemplateTeamUpdater(payload, {atmosphere, store})
    },
    optimisticUpdater: (store) => {
      const {templateId} = variables
      const template = store.get<IPokerTemplate>(templateId)!
      const teamId = template.getValue('teamId')
      handleRemoveTemplate(templateId, teamId, store, MeetingTypeEnum.poker)
    }
  })
}

export default RemovePokerTemplateMutation
