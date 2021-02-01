export function errorMessageFormatter(err: any): string {
  if (typeof err === 'string') {
    return err;
  }

  switch ((err || {}).message) {
    case 'no-internet':
    case 'NETWORK_ERROR':
      return 'Sem conexão com a internet';
    case 'auth/user-not-found':
      return 'Login inválido.'
    default:
      return 'Algo deu errado...';
  }
}
