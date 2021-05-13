import styles from './index.less';
import { Link } from 'umi';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>

      <Link to="/a/one">Go to AModule One</Link>
      <div />
      <Link to="/a/two">Go to AModule Two</Link>
      <div />

      <Link to="/two">Go to Two</Link>
      <br />
    </div>
  );
}
