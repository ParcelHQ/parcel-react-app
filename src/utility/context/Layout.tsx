import React, { createContext } from 'react';
import VerticalLayout from '../../layouts/VerticalLayout';
import FullLayout from '../../layouts/FullpageLayout';
import themeConfig from '../../configs/themeConfig';
const layouts = {
  vertical: VerticalLayout,
  full: FullLayout,
};

//@ts-ignore
export const ContextLayout = createContext();

export class Layout extends React.Component {
  state = {
    activeLayout: themeConfig.layout,
    width: window.innerWidth,
    lastLayout: null,
  };

  updateWidth = () => {
    this.setState({
      width: window.innerWidth,
    });
  };

  handleWindowResize = () => {
    this.updateWidth();
    if (this.state.activeLayout === 'horizontal' && this.state.width <= 1199) {
      this.setState({
        activeLayout: 'vertical',
        lastLayout: 'horizontal',
      });
    }

    if (this.state.lastLayout === 'horizontal' && this.state.width >= 1199) {
      this.setState({
        activeLayout: 'horizontal',
        lastLayout: 'vertical',
      });
    }
  };

  componentDidMount = () => {
    //@ts-ignore
    if (window !== 'undefined') {
      window.addEventListener('resize', this.handleWindowResize);
    }
    this.handleDirUpdate();
    if (this.state.activeLayout === 'horizontal' && this.state.width <= 1199) {
      this.setState({
        activeLayout: 'vertical',
      });
    } else if (
      themeConfig.layout === 'horizontal' &&
      this.state.width >= 1200
    ) {
      this.setState({
        activeLayout: 'horizontal',
      });
    } else {
      this.setState({
        activeLayout: 'vertical',
      });
    }
  };

  componentDidUpdate() {
    this.handleDirUpdate();
  }

  handleDirUpdate = () => {
    document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
  };

  render() {
    const { children } = this.props;
    return (
      <ContextLayout.Provider
        value={{
          state: this.state,
          fullLayout: layouts['full'],
          VerticalLayout: layouts['vertical'],
        }}
      >
        {children}
      </ContextLayout.Provider>
    );
  }
}
