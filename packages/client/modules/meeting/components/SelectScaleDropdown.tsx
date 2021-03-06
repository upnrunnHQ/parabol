import graphql from 'babel-plugin-relay/macro'
import React, {useMemo} from 'react'
import {createFragmentContainer} from 'react-relay'
import UpdatePokerTemplateDimensionScaleMutation from '../../../mutations/UpdatePokerTemplateDimensionScaleMutation'
import Menu from '../../../components/Menu'
import MenuItem from '../../../components/MenuItem'
import useAtmosphere from '../../../hooks/useAtmosphere'
import {MenuProps} from '../../../hooks/useMenu'
import useMutationProps from '../../../hooks/useMutationProps'
import {SelectScaleDropdown_dimension} from '../../../__generated__/SelectScaleDropdown_dimension.graphql'
import ScaleDropdownMenuItem from './ScaleDropdownMenuItem'

interface Props {
  menuProps: MenuProps
  dimension: SelectScaleDropdown_dimension
}

const SelectScaleDropdown = (props: Props) => {
  const {menuProps, dimension} = props
  const {id: dimensionId, availableScales} = dimension
  const atmosphere = useAtmosphere()
  const {submitting, submitMutation, onError, onCompleted} = useMutationProps()
  const setScale = (scaleId: any) => () => {
    if (submitting) return
    submitMutation()
    UpdatePokerTemplateDimensionScaleMutation(atmosphere, {dimensionId, scaleId}, {onError, onCompleted})
  }
  const defaultActiveIdx = useMemo(() => availableScales.findIndex(({id}) => id === dimension.selectedScale.id), [dimension])
  return (
    <Menu ariaLabel={'Select the scale for this dimension'} {...menuProps} defaultActiveIdx={defaultActiveIdx}>
      {availableScales.map((scale) =>
        <MenuItem
          key={scale.id}
          label={<ScaleDropdownMenuItem scale={scale} />}
          onClick={setScale(scale.id)}
        />
      )}
    </Menu >
  )
}

export default createFragmentContainer(SelectScaleDropdown, {
  dimension: graphql`
    fragment SelectScaleDropdown_dimension on TemplateDimension {
      id
      name
      selectedScale {
        id
        ...ScaleDropdownMenuItem_scale
      }
      availableScales {
        id
        ...ScaleDropdownMenuItem_scale
      }
    }
  `
})
