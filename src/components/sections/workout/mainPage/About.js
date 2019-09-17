import React from "react";
import { View, Text, Image } from "react-native";
import Title from "src/components/common/title";

class AboutSection extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  pressFunc = next => {
    this.props.onPressEvent(next, this.props.params);
  };
  
  render() {
    const { background_image, name, description } = this.props;
    return (
      <View>
        <Image source={{ uri: background_image }} style={{ height: 300 }} />
        <Title
          title={name}
          {...{
            textAlign: "center",
            fontSize: 20,
            padding: 10
          }}
        />
        <If condition={description}>
          <Text style={{ padding: 10, color: "#454545", fontSize: 14 }}>
            {description}
          </Text>
        </If>
      </View>
    );
  }
}

export default AboutSection;
