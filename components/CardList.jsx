import { View } from 'react-native'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '~/components/ui/card';
  import { Text } from '~/components/ui/text';

const CardList = ({item}) => {
  return (
    <Card className='w-full max-w-sm bg-gray-100 border-gray-300 h-32'>
    <CardHeader>
      <CardTitle className='text-black'>{item?.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <Text className='text-black text-center'>Nombre of Orders :</Text>
    </CardContent>

  </Card>
  )
}

export default CardList