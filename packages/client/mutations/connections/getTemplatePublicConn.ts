import {ConnectionHandler, ReadOnlyRecordProxy} from 'relay-runtime'

const getReflectTemplatePublicConn = (meetingSettings: ReadOnlyRecordProxy | null | undefined) => {
  if (meetingSettings) {
    const meetingType = meetingSettings.getValue('meetingType')
    return ConnectionHandler.getConnection(meetingSettings, `${meetingType}TemplateListPublic_publicTemplates`)
  }
  return null
}

export default getReflectTemplatePublicConn
