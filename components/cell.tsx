import { View, StyleSheet, Text } from "react-native";

interface ICell {
    x: number,
    y: number,
    isSafe: boolean,
    index: number,
}

const BOX_SIZE = 25; // Define the size of each box in the grid

const Cell = (props: {props:ICell}) => {
    const cellProps = props.props
    const isSafe = () => {
        return cellProps.isSafe
    }

    const getPos = () => {
        return {
            x: cellProps.x,
            y: cellProps.y
        }
    }
    
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