import {commitMutation} from 'react-relay'
import graphql from 'babel-plugin-relay/macro'
import {Disposable} from 'relay-runtime'
import Atmosphere from '../Atmosphere'
import {CompletedHandler, ErrorHandler} from '../types/relayMutations'
import {IRenamePokerTemplateOnMutationArguments} from '../types/graphql'

graphql`
  fragment RenamePokerTemplateMutation_team on RenamePokerTemplatePayload {
    pokerTemplate {
      name
    }
  }
`

const mutation = graphql`
  mutation RenamePokerTemplateMutation($templateId: ID!, $name: String!) {
    renamePokerTemplate(templateId: $templateId, name: $name) {
      ...RenamePokerTemplateMutation_team @relay(mask: false)
    }
  }
`

const RenamePokerTemplateMutation = (
  atmosphere: Atmosphere,
  variables: IRenamePokerTemplateOnMutationArguments,
  _context: {},
  onError: ErrorHandler,
  onCompleted: CompletedHandler
): Disposable => {
  return commitMutation(atmosphere, {
    mutation,
    variables,
    onCompleted,
    onError,
    optimisticUpdater: (store) => {
      const {name, templateId} = variables
      const template = store.get(templateId)
      if (!template) return
      template.setValue(name, 'name')
    }
  })
}

export default RenamePokerTemplateMutation
