import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        {/* <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a> */}
        <span className="ms-1">&copy; 2024 RedSpark .</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <span>RedSpark Technologies</span>
        {/* <a 
        href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          CoreUI React Admin &amp; Dashboard Template
        </a> */}
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
