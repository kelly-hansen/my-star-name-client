import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { history } from '../../routers/AppRouter'

const BreadCrumbs = ({ links, isLandlord, isTenant }) => {
  // const links = [
  //   { key: 'Tenant' },
  //   { key: 'Tenant2', onClick: () => { console.log('hi tenant2')}}
  // ]
  return (
    <div className='px-5 px-lg-0 text-muted pt-4 pt-lg-0'>
      {isLandlord &&
      <Fragment>
        <span className='text-hover pointer' onClick={() => history.push(`/application/landlord`)}>
          <span className='fas fa-chevron-left mr-2' />Back to Application</span>
        <span> / </span>
      </Fragment>
      }
      {isTenant &&
      <Fragment>
        <span className='text-hover pointer' onClick={() => history.push(`/application/tenant`)}>
          <span className='fas fa-chevron-left mr-2' />Back to Application</span>
        <span> / </span>
      </Fragment>
      }
      {links.map((d, i) => {
        return (
          <Fragment key={i}>
            <span className={d.onClick ? 'pointer' : ''} onClick={d.onClick}>{d.key}</span>
            {i < links.length - 1 ? <span> / </span> : null}
          </Fragment>
        )
      })}
    </div>
  )
}

BreadCrumbs.propTypes = {
  isLandlord: PropTypes.bool,
  isTenant: PropTypes.bool,
  links: PropTypes.array
}

export default BreadCrumbs
