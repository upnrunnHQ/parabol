import {GraphQLObjectType} from 'graphql'
import PokerMeetingSettings from './PokerMeetingSettings'
import StandardMutationError from './StandardMutationError'
import {GQLContext} from '../graphql'

const SelectPokerTemplatePayload = new GraphQLObjectType<any, GQLContext>({
  name: 'SelectPokerTemplatePayload',
  fields: () => ({
    error: {
      type: StandardMutationError
    },
    pokerMeetingSettings: {
      type: PokerMeetingSettings,
      resolve: ({meetingSettingsId}, _args, {dataLoader}) => {
        return meetingSettingsId ? dataLoader.get('meetingSettings').load(meetingSettingsId) : null
      }
    }
  })
})

export default SelectPokerTemplatePayload
