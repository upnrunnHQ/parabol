import styled from '@emotion/styled'
import graphql from 'babel-plugin-relay/macro'
import React from 'react'
import {createFragmentContainer} from 'react-relay'
import {TemplateScalePicker_scales} from '../../../__generated__/TemplateScalePicker_scales.graphql'
import {TemplateScalePicker_selectedScale} from '../../../__generated__/TemplateScalePicker_selectedScale.graphql'
import lazyPreload from '../../../utils/lazyPreload'
import {MenuPosition} from '~/hooks/useCoords'
import useMenu from '~/hooks/useMenu'
import {PALETTE} from '~/styles/paletteV2'
import useTooltip from '~/hooks/useTooltip'
import MenuToggleV2Text from '~/components/MenuToggleV2Text'
import Icon from '~/components/Icon'
import {ICON_SIZE} from '~/styles/typographyV2'

interface Props {
  selectedScale: TemplateScalePicker_selectedScale
  scales: TemplateScalePicker_scales
}

const SelectScaleDropdown = lazyPreload(() =>
  import(
    /* webpackChunkName: 'SelectScaleDropdown' */
    './SelectScaleDropdown'
  )
)


const DropdownIcon = styled(Icon)({
  color: PALETTE.TEXT_MAIN,
  padding: 8,
  fontSize: ICON_SIZE.MD18
})

const DropdownBlock = styled('div')<{disabled: boolean}>(({disabled}) => ({
  background: disabled ? PALETTE.BACKGROUND_MAIN : '#fff',
  border: `1px solid ${PALETTE.BORDER_DROPDOWN}`,
  borderRadius: '50px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  display: 'flex',
  fontSize: 13,
  lineHeight: '20px',
  minWidth: 168,
  margin: '0px 0px 0px 32px',
  userSelect: 'none'
}))

const TemplateScalePicker = (props: Props) => {
  const {selectedScale, scales} = props
  const {togglePortal, menuPortal, originRef} = useMenu<HTMLDivElement>(
    MenuPosition.LOWER_RIGHT,
    {
      isDropdown: true,
      id: 'selectScaleDropdown',
      parentId: 'pokerTemplateModal'
    }
  )
  const {openTooltip, closeTooltip} = useTooltip<
    HTMLDivElement
  >(MenuPosition.LOWER_CENTER, {
    disabled: false
  })
  return (
    <>
      <DropdownBlock
        onMouseEnter={SelectScaleDropdown.preload}
        onClick={togglePortal}
        ref={originRef}
        disabled={false}
        onMouseOver={openTooltip}
        onMouseLeave={closeTooltip}
      >
        <MenuToggleV2Text icon={''} label={selectedScale.name} />
        <DropdownIcon>expand_more</DropdownIcon>
      </DropdownBlock>
      {menuPortal(<SelectScaleDropdown scales={scales} />)}
    </>
  )
}

export default createFragmentContainer(TemplateScalePicker, {
  selectedScale: graphql`
    fragment TemplateScalePicker_selectedScale on TemplateScale {
      id
      name
    }
  `,
  scales: graphql`
    fragment TemplateScalePicker_scales on TemplateScale @relay(plural: true) {
      ...SelectScaleDropdown_scales
    }
  `
})
