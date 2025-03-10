import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle, CSidebarHeader } from '@coreui/react'


const _nav = [
  
  
  
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilPuzzle} customClasName="nav-icon" style={{marginRight:"10px"}}/>,
  },

  {
    component: CNavItem,
    name: 'Student List',
    to: '/dashboard/StudentList',
    icon: <CIcon icon={cilCalculator} customClasName="nav-icon" style={{marginRight:"10px"}}/>,
  },
  

  {
    component: CNavItem, 
    name: 'New Student',
    to: '/dashboard/NewStudent',
    icon: <CIcon icon={cilCalculator} customClasName="nav-icon" style={{marginRight:"10px"}}/>,
  },
  
]

export default _nav
