
export function voteValueDescription(value) {
  switch (value) {
    case 1:
    return 'kyllä';
    case 0:
    return 'tyhjä';
    case -1:
    return 'ei';
  }
  return 'whatever';
}

