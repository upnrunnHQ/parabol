import {RecordSourceSelectorProxy} from 'relay-runtime'
import pluralizeHandler from './pluralizeHandler'
import removeFromRefs from '../../utils/relay/removeFromRefs'

const handleRemoveTemplatePrompt = (promptId: string, store: RecordSourceSelectorProxy) => {
  store.delete(promptId)
  removeFromRefs(promptId, store, {ReflectTemplate: ['prompts']})
}

const handleRemoveTemplatePrompts = pluralizeHandler(handleRemoveTemplatePrompt)
export default handleRemoveTemplatePrompts
