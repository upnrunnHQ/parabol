import graphql from 'babel-plugin-relay/macro'
import React from 'react'
import {createFragmentContainer} from 'react-relay'
import TemplateDetailAction from '../../../components/TemplateDetailAction'
import useAtmosphere from '../../../hooks/useAtmosphere'
import useMutationProps from '../../../hooks/useMutationProps'
import RemovePokerTemplateMutation from '../../../mutations/RemovePokerTemplateMutation'
import SelectPokerTemplateMutation from '../../../mutations/SelectPokerTemplateMutation'
import {RemoveTemplate_teamTemplates} from '../../../__generated__/RemoveTemplate_teamTemplates.graphql'


interface Props {
  gotoPublicTemplates: () => void
  teamTemplates: RemoveTemplate_teamTemplates
  templateId: string
  teamId: string
}

const RemovePokerTemplate = (props: Props) => {
  const {
    gotoPublicTemplates,
    templateId,
    teamId,
    teamTemplates,
  } = props
  const atmosphere = useAtmosphere()
  const {onError, onCompleted, submitting, submitMutation} = useMutationProps()

  const removePokerTemplate = () => {
    if (submitting) return
    submitMutation()
    const templateIds = teamTemplates.map(({id}) => id)
    const templateIdx = templateIds.indexOf(templateId)
    templateIds.splice(templateIdx, 1)
    // use the same index as the previous item. if the item was last in the list, grab the new last
    const nextTemplateId = templateIds[templateIdx] || templateIds[templateIds.length - 1]
    if (nextTemplateId) {
      SelectPokerTemplateMutation(atmosphere, {selectedTemplateId: nextTemplateId, teamId})
    } else {
      gotoPublicTemplates()
    }
    RemovePokerTemplateMutation(atmosphere, {templateId}, {onError, onCompleted})
  }

  return <TemplateDetailAction icon={'delete'} tooltip={'Delete template'} onClick={removePokerTemplate} />
}
export default createFragmentContainer(
  RemovePokerTemplate,
  {
    teamTemplates: graphql`
      fragment RemovePokerTemplate_teamTemplates on PokerTemplate @relay(plural: true) {
        id
      }`
  }
)
