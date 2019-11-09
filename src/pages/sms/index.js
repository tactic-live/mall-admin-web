import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { PrivateRoute } from '@/components/advance-route';

function sms({ match, ...rest }) {
  console.log('oms', match, rest)

  return (
    <div>
      <Switch>
        <PrivateRoute
          exact
          path={`${match.path}/brand`}
          component={loadable(() => import('./Brand'))}
          routeName="品牌推荐"
        />
        <PrivateRoute
          exact
          path={`${match.path}/new`}
          component={loadable(() => import('./New'))}
          routeName="新品推荐"
        />

        <PrivateRoute
          exact
          path={`${match.path}/flash`}
          component={loadable(() => import('./Flash'))}
          routeName="秒杀活动列表"
        />
        <PrivateRoute
          exact
          path={`${match.path}/selectSession`}
          component={loadable(() => import('./SelectSession'))}
          routeName="秒杀时间段选择"
        />
        <PrivateRoute
          exact
          path={`${match.path}/flashProductRelation`}
          component={loadable(() => import('./FlashProductRelation'))}
          routeName="秒杀时段商品选择"
        />
        <PrivateRoute
          exact
          path={`${match.path}/flashSession`}
          component={loadable(() => import('./FlashSession'))}
          routeName="秒杀时间段列表"
        />
           <PrivateRoute
          exact
          path={`${match.path}/addFlashProductRelation`}
          component={loadable(() => import('./AddFlashProductRelation'))}
          routeName="添加秒杀时段商品"
        />
        <PrivateRoute exact path={`${match.path}/hot`} component={loadable(() => import('./Hot'))} routeName="人气推荐" />
        <PrivateRoute exact path={`${match.path}/coupon`} component={loadable(() => import('./Coupon'))} routeName="优惠券列表" />
        <PrivateRoute exact path={`${match.path}/couponDetail/:id`} component={loadable(() => import('./CouponDetail'))} routeName="优惠券详情" />
        <PrivateRoute exact path={`${match.path}/couponAdd/:id`} component={loadable(() => import('./AddCoupon'))} routeName="添加优惠券" />
        <PrivateRoute exact path={`${match.path}/advertise`} component={loadable(() => import('./Advertise'))} routeName="广告列表" />
        <PrivateRoute exact path={`${match.path}/addAdvertise`} component={loadable(() => import('./AddAdvertise'))} routeName="添加广告" />
        <PrivateRoute exact path={`${match.path}/updateAdvertise`} component={loadable(() => import('./UpdateAdvertise'))} routeName="编辑广告" />
        <Redirect to="/404" />
      </Switch>
    </div>
  )
}

export default sms;
