type ClassPredicate = [boolean, string, string?]

type ClassEntries = Array<string | ClassPredicate>

export const cx = (...classes: ClassEntries): string => {
  return classes.reduce((acc: string, classEntry) => {
    if (!classEntry) {
      return acc
    }

    if (Array.isArray(classEntry)) {
      const [isActive, trueClass, falseClass] = classEntry

      return isActive
        ? acc.concat(` ${trueClass}`)
        : falseClass
        ? acc.concat(` ${falseClass}`)
        : acc
    }

    return acc.concat(` ${classEntry}`)
  }, '')
}
