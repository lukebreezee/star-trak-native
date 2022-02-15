import { StackDecider } from './components/StackDecider';
import { Store } from './global-state/Store';

export default function App() {
  return (
    <Store>
      <StackDecider />
    </Store>
  );
}