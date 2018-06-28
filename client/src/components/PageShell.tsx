import * as React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { AppLayout } from '../components/AppLayout';

const PageShell = (Page: any, current: string) => {
    return (props: any) =>
      <AppLayout current={current}>
        <CSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          transitionName={'fade'}
        >
          <Page {...props} />
        </CSSTransitionGroup>
        </AppLayout>;
};

export default PageShell;