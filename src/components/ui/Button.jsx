export default function Button({ href, variant = 'filled', className = '', children, ...props }) {
  const classes = `button button--${variant} ${className}`;
  if (href) return <a className={classes} href={href} {...props}>{children}</a>;
  return <button className={classes} {...props}>{children}</button>;
}
