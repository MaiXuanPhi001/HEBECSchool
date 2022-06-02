import { Image, Text, StyleSheet, TouchableOpacity } from "react-native";
export const Item = ({ data, navigation }: any) => (
    <TouchableOpacity 
    onPress={() => navigation.navigate("ListProduct",{
        id: data.id,
    })}
    style={styles.item}>
      <Image style = {styles.icon} source={{uri: 'https://163clone.bmdapp.store:4164'+data.thumbnail}}/>
      <Text numberOfLines={2} style={styles.title}>{data.name}</Text>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 100,
      
    },
    title: {
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        maxWidth: 85,
        maxHeight: 100,
        flexWrap: 'wrap',
    },
    icon: {
        width: 60,
        height: 60,
        },

  }
        
  );