import {RecordSourceSelectorProxy} from 'relay-runtime'
import {IRetrospectiveMeetingSettings, MeetingTypeEnum} from '../../types/graphql'
import safeRemoveNodeFromArray from '../../utils/relay/safeRemoveNodeFromArray'
import safeRemoveNodeFromConn from '../../utils/relay/safeRemoveNodeFromConn'
import getTemplateOrgConn from '../connections/getTemplateOrgConn'
import getTemplatePublicConn from '../connections/getTemplatePublicConn'
import pluralizeHandler from './pluralizeHandler'

const handleRemoveTemplate = (templateId: string, teamId: string, store: RecordSourceSelectorProxy<any>, meetingType: MeetingTypeEnum) => {
  const team = store.get(teamId)!
  const settings = team.getLinkedRecord<IRetrospectiveMeetingSettings>('meetingSettings', {
    meetingType: meetingType
  })
  safeRemoveNodeFromArray(templateId, settings, 'teamTemplates')
  const orgConn = getTemplateOrgConn(settings)
  const publicConn = getTemplatePublicConn(settings)
  safeRemoveNodeFromConn(templateId, orgConn)
  safeRemoveNodeFromConn(templateId, publicConn)

}

const handleRemoveTemplates = pluralizeHandler(handleRemoveTemplate)
export default handleRemoveTemplates
