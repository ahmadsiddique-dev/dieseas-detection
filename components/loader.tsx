import { Loader2 } from 'lucide-react';

interface LoaderInterface {
    isLoading: boolean;
    text?: string;
    className?: string
}

const Loader = ({isLoading, text = 'Submit', className}: LoaderInterface) => {
  return (
    <>
    {isLoading ? <Loader2 className={`${className} animate-spin`} />: text}
    </>
  )
}

export default Loader