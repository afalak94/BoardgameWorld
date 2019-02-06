import { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<any> {}

export class ScrollToTop extends Component<Props> {
  componentDidUpdate(prevProps: Props) {
    // console.log(this.props);
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

// need to export it as default, otherwise the component in
// routing doesnt recive this.props.location
export default withRouter<Props>(ScrollToTop);
