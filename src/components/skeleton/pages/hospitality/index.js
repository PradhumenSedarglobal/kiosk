import { Box } from '@mui/material'
import React from 'react'
import SkeletonHospitalityBanner from './banner'
import SkeletonHospitalityInfo from './hospitalityInfo'
import WebLayoutSkeleton from '../../layout'

const HospitalitySkeleton = () => {
  return (
    <WebLayoutSkeleton>
      <Box>
        <SkeletonHospitalityBanner />
        <SkeletonHospitalityInfo />
      </Box>
    </WebLayoutSkeleton>
  )
}

export default HospitalitySkeleton