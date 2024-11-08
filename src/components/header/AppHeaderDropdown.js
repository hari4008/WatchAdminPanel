import React from 'react'
import {
  CAvatar,
  // CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {

  cilLockLocked,
  cilSettings,
  // cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useAuth } from 'src/RTK/context/authProvider';
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const {logout} = useAuth();
  const navigate = useNavigate();
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={() => {
          return (
            logout(),
            navigate('/login')
          )
        }}>
          <CIcon icon={cilLockLocked}  className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
