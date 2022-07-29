import classNames from "classnames"

function Button({outline, children, className}) {
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