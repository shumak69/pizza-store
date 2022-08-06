import classNames from "classnames"

type CategoriesProps = {
  outline?: boolean;
  children: JSX.Element | JSX.Element[];
  className: string; 
}

function Button({outline, children, className}: CategoriesProps) {
  return (
    <button
    className={classNames('button', className, {
        'button--outline': outline,
    })}>
        {children}
    </button>
  )
}

export default Button