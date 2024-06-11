import { Skeleton } from '~/components/ui/skeleton';
import { View, StyleSheet, } from 'react-native'


const SkeletonLoader = () => {
  return (
    <View style={{ flex: 1 }}>
      {Array(4).fill(0).map((_, index) => (
        <View key={index} style={{flex: 1}}>
          <View style={[styles.itemContainer, { justifyContent: "space-between", alignItems: "center", flexDirection: "row" }]}>
            <Skeleton className='h-20 w-20 rounded-2xl' />
            <View style={{ marginLeft: 10, flexDirection: "column", alignItems: "flex-start", gap: 10 }} className='mr-auto'>
              <Skeleton className='h-4 w-28 rounded-md' />
              <Skeleton className='h-4 w-32 rounded-md' />
            </View>
            <View className='flex justify-end items-end gap-4'>
              <Skeleton className='h-4 w-16 rounded-md' />
              <Skeleton className='h-4 w-12 rounded-md' />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
})

export default SkeletonLoader