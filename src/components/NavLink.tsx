import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Props para o componente NavLink com suporte a classes específicas para estados
 */
interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  /** Classes CSS base do link */
  className?: string;
  /** Classes aplicadas quando o link está ativo */
  activeClassName?: string;
  /** Classes aplicadas quando a navegação está pendente */
  pendingClassName?: string;
  /** Classes aplicadas quando o link está em transição */
  transitioningClassName?: string;
}

/**
 * Componente NavLink que estende o NavLink do react-router-dom
 * com suporte a classes CSS específicas para diferentes estados
 */
const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  (
    { 
      className, 
      activeClassName, 
      pendingClassName, 
      transitioningClassName,
      to, 
      ...props 
    }, 
    ref
  ) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending, isTransitioning }) =>
          cn(
            className, 
            isActive && activeClassName, 
            isPending && pendingClassName,
            isTransitioning && transitioningClassName
          )
        }
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
export type { NavLinkCompatProps };