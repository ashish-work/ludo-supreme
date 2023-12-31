import { View, StyleSheet, Text } from "react-native";


const BOX_SIZE = 25; // Define the size of each box in the grid

const Cell = (props) => {
  const cellProps = props.props

  return (<View
    key={cellProps.index}
    style={[
      styles.box,
      {
        left: cellProps.x,
        top: cellProps.y,
      },
    ]}
  >
    {/* <Text>{cellProps.index}</Text> */}
  </View>
  )
}


const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: 'grey',
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default Cell