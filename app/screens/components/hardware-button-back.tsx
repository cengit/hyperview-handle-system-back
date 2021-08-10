import {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {BackHandler} from 'react-native';
import {parse} from 'query-string';
import {NavigationNavigator} from 'react-navigation';
/** note: BackHandler is android only */
class HardwareButtonBack extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBack);
  }

  onBack = () => {
    if (
      this.props.navigation &&
      this.props.navigation.goBack &&
      !this.props.navigation.isFirstRouteInParent()
    ) {
      const {url} = this.props.navigation.state.params;
      // handle hv [navigate] and [event]
      const isStopPropagation = this.props.systemBack(url);
      return isStopPropagation; // true: no other back action will execute
    }
    return false;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBack);
  }

  render() {
    return this.props.children;
  }
}

export default withNavigation(HardwareButtonBack);

interface Props {
  navigation: NavigationNavigator;
  systemBack: (url: string) => boolean;
}
