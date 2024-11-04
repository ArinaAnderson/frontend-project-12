import cn from 'classnames';
import _ from 'lodash';

import './Skeleton.css';

const Skeleton = ({ times, className }) => {
  const classNames = cn('skeleton', 'animate-pulse', className);

  const boxes = Array(times).fill(0).map(() => (
    <div className={classNames} key={_.uniqueId()} />
  ));

  return boxes;
};

export default Skeleton;
