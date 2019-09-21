import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import DEFAULT_SUFFIXES from './defaultSuffixes.js';

/**
 * Set actions
 * @param {Object} constants    [description]
 * @param {[type]} paramsAction [description]
 */
export default function setActions(types, paramsAction) {
  return Object.keys(types).reduce((actionCollection, actionType) => {
    // Si la constante a été générée automatiquement, ou écrite proprement
    if (types[actionType].includes(':')) {
      // Et qu'en plus, elle possède un des suffixes prédéfinis
      const params = paramsAction[actionType];
      let optionalParamsNb = 0;
      if (params) {
        params.forEach((param, index) => {
          if (param.indexOf('?') !== -1) {
            optionalParamsNb += 1;
            params[index] = params[index].slice(0, -1);
          }
        });
      }
      let functionName = '';
      if (DEFAULT_SUFFIXES.some(elem => actionType.includes(elem))) {
        const typeParts = types[actionType].split(':');
        functionName = actionType.includes('LOADING') ? typeParts[2] : `on${upperFirst(typeParts[2])}${upperFirst(typeParts[3])}`;
      } else {
        functionName = `${camelCase(actionType)}`;
      }
      // On génère l'action comme prédéfinie
      actionCollection[functionName] = (...args) => {
        let result = {};
        const argument = Array.from(args);
        if (actionType.includes('FAILED')) {
          result.error = argument[0];
          argument.splice(0, 1);
        }
        if (argument.length) {
          if (params && (
            params.length === argument.length ||
            params.length - optionalParamsNb <= argument.length
          )) {
            result = argument.reduce((argCollection, arg, i) => Object.assign({}, argCollection, { [params[i]]: arg }), {});
          } else {
            throw new Error(
              `frutils:setActions - T'es ouf ou quoi ? Tu me passes en paramètre ${params}
              alors que j'ai en argument de ta fonction : ${[...argument]}. Pense bien à rajouter un argument
              correspondant à la constante ${actionType}, ou appelle-le avec les bons paramètres, merde !`
            );
          }
        }
        result.type = types[actionType];
        if (typeof window !== 'undefined' && window.DEBUG_ACTIONS && typeof window.console !== 'undefined') {
          console.info('Redux action debugging: ', { type: actionType, functionName, args, params, action: result });
        }
        return result;
      };
    }
    return actionCollection;
  }, {});
}
