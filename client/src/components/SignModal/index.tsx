import React, { useState } from 'react';
import SignIn from '../SignIn';
import SingUp from '../SignUp';

const SignModal = React.forwardRef<React.Ref<HTMLDivElement>>((_props, ref) => {
  const [typeModal, setTypeModal] = useState(false);

  if (!typeModal) {
    return <SignIn setTypeModal={setTypeModal} />;
  } else {
    <SingUp setTypeModal={setTypeModal} />;
  }
});

export default SignModal;
