import { Typography } from '@mui/material';
import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import Todo from './components';
import { RealmRepository } from './repository';

function App() {
  const [realmRepository, setRealmRepository] = useState(undefined);


  useAsyncEffect(async () => {
    let mounted = true;
    const repository = new RealmRepository();
    await repository.init();
    if (mounted) {
      setRealmRepository(repository);
    }
    return () => {
      mounted = false;
    }
  }, []);

  return (
    <div>
      {realmRepository === undefined
        ? <Typography variant="h3">Loading...</Typography>
        : <Todo repository={realmRepository} />
      }
    </div>
  );
}

export default App;
