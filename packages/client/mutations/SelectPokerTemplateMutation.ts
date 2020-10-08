import graphql from 'babel-plugin-relay/macro'
import {commitMutation} from 'react-relay'
import {IReflectTemplate} from '../types/graphql'
import {SimpleMutation} from '../types/relayMutations'
import {RETROSPECTIVE} from '../utils/constants'
import {SelectPokerTemplateMutation as TSelectPokerTemplateMutation} from '../__generated__/SelectPokerTemplateMutation.graphql'

graphql`
  fragment SelectPokerTemplateMutation_team on SelectPokerTemplatePayload {
    pokerMeetingSettings {
      selectedTemplateId
      selectedTemplate {
        id
      }
    }
  }
`

const mutation = graphql`
  mutation SelectPokerTemplateMutation($selectedTemplateId: ID!, $teamId: ID!) {
    selectPokerTemplate(selectedTemplateId: $selectedTemplateId, teamId: $teamId) {
      ...SelectPokerTemplateMutation_team @relay(mask: false)
    }
  }
`

const SelectPokerTemplateMutation: SimpleMutation<TSelectPokerTemplateMutation> = (
  atmosphere,
  variables,
) => {
  return commitMutation(atmosphere, {
    mutation,
    variables,
    optimisticUpdater: (store) => {
      const {selectedTemplateId, teamId} = variables
      const team = store.get(teamId)
      if (!team) return
      const meetingSettings = team.getLinkedRecord('meetingSettings', {meetingType: RETROSPECTIVE})
      if (!meetingSettings) return
      const selectedTemplate = store.get<IReflectTemplate>(selectedTemplateId)!
      meetingSettings.setValue(selectedTemplateId, 'selectedTemplateId')
      meetingSettings.setLinkedRecord(selectedTemplate, 'selectedTemplate')
    }
  })
}

export default SelectPokerTemplateMutation
