import {ConnectionHandler, ReadOnlyRecordProxy} from 'relay-runtime'


const getTemplateOrgConn = (meetingSettings: ReadOnlyRecordProxy | null | undefined) => {
  if (meetingSettings) {
    const meetingType = meetingSettings.getValue('meetingType')
    return ConnectionHandler.getConnection(meetingSettings, `${meetingType}TemplateListOrg_organizationTemplates`)
  }
  return null
}

export default getTemplateOrgConn
