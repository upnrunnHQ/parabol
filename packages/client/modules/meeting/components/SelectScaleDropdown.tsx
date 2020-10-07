import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import {createFragmentContainer} from 'react-relay'
import {SelectScaleDropdown_scales} from '../../../__generated__/SelectScaleDropdown_scales.graphql'
import Menu from '../../../components/Menu'
import MenuItem from '../../../components/MenuItem'
import {MenuProps} from '../../../hooks/useMenu'
import styled from '@emotion/styled'
import {PALETTE} from '~/styles/paletteV2'
import DropdownMenuItemLabel from '~/components/DropdownMenuItemLabel'
import Icon from '~/components/Icon'
import {ICON_SIZE} from '~/styles/typographyV2'

interface Props {
  menuProps: MenuProps
  scaleHandleClick: (scaleId: string, e: React.MouseEvent) => void
  scales: SelectScaleDropdown_scales
}

const CreateScaleBlock = styled('div')({
  position: 'static',
  flex: 'none',
  alignSelf: 'center',
  margin: '0px 0px'
})

const CreateScaleLabelBlock = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '12px 0px 0px 16px',
  position: 'absolute'
})

const StyledIcon = styled(Icon)({
  color: PALETTE.TEXT_MAIN,
  fontSize: ICON_SIZE.MD24,
})

const CreateScaleLabel = styled('div')({
  borderTop: `1px solid ${PALETTE.BORDER_LIGHTER}`,
  color: PALETTE.TEXT_BLUE,
  fontSize: 16,
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
})

const SelectScaleDropdown = (props: Props) => {
  const {scales, menuProps, scaleHandleClick} = props
  return (
    <Menu ariaLabel={'Select the scale associated with the dimension'} {...menuProps}>
      {scales.map((scale) => {
        return (
          <MenuItem
            key={scale.id}
            label={<DropdownMenuItemLabel>{scale.name}</DropdownMenuItemLabel>}
            onClick={(e) => scaleHandleClick(scale.id, e)}
          />
        )
      })}
      <CreateScaleBlock>
        <CreateScaleLabelBlock>
          <CreateScaleLabel>Create a scale:</CreateScaleLabel>
        </CreateScaleLabelBlock>
        <StyledIcon>{'add'}</StyledIcon>
      </CreateScaleBlock>
    </Menu>
  )
}

export default createFragmentContainer(SelectScaleDropdown, {
  scales: graphql`
    fragment SelectScaleDropdown_scales on TemplateScale @relay(plural: true) {
      id
      name
      values {
        label
      }
    }
  `
})
