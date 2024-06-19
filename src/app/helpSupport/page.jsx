import Image from 'next/image'
import React from 'react'
import help_support from "../../../lib/assets/help_support.svg"
import Heading from '@/Components/ui/Heading'

function helpSupport() {
  return (
    <>
    <Heading title="Help and Support"></Heading>
    <Image src={help_support} className='m-auto'></Image>
    </>
  )
}

export default helpSupport