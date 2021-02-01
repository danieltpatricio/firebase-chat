import { memo, Props, useState, useEffect, useContext } from 'react';
import { AuthContext } from 'stores/auth';

interface IProps extends Props<{}> {
  passIfNull?: boolean;
  role?: any;
  inverse?: boolean;
}

const PermissionHide = memo<IProps>(props => {
  const [canAccess, setCanAccess] = useState(true);
  const { store } = useContext(AuthContext);
  
  useEffect(()=> {
    const can = Boolean(store.user?.uid);
    setCanAccess(can)
  }, [store.user?.uid])

  if (canAccess === undefined || canAccess === null) {
    return null;
  }

  if (props.inverse && !canAccess) {
    return props.children as any;
  }

  if (props.inverse || !canAccess) {
    return null;
  }

  return props.children as any;
});

export default PermissionHide;
