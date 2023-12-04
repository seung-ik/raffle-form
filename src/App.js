import { useEffect } from 'react';
import Header from './components/Header.tsx';
import Router from './pages/Router.tsx';
import { auth } from './firebase';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '@store/userState';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    // 컴포넌트가 언마운트되면 이벤트 리스너를 정리합니다.
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
