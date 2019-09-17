import React from "react";
import { View, Text } from "react-native";
import Title from "src/components/common/title";
import Icon from "react-native-vector-icons/FontAwesome";

class AdditionalSection extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Title
          title={"Additional - PDF's & Documents"}
          {...{
            fontSize: 18,
            padding: 10,
            // color: "white"
          }}
        />
        {this.props.downloads &&
          this.props.downloads.map(item => {
            return (
              <View
                style={{
                  backgroundColor: "#002135",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 15,
                  marginBottom: 5
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 17, fontWeight: "bold" }}
                >
                  {item.name}
                </Text>
                <Icon name={"chevron-right"} color={"white"} size={17} />
              </View>
            );
          })}
      </View>
    );
  }
}

export default AdditionalSection;
