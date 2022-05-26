import { View, Image, Text, StyleSheet } from "react-native";
export const Item = ({ title, icon }) => (
    <View style={styles.item}>
      <Image style = {styles.icon} source={icon}/>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5,
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
