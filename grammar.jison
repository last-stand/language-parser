/* description: Parses and executes english statements. */

/* lexical grammar */
%lex
%%

\s+                                      /* skip whitespace */
('Oggy'|'Tom'|'India'|'New Delhi')        return 'PROPER'
('Wolf'|'Dog'|'Fish')                     return 'COMMON'
('He'|'She'|'It')                         return 'PRONOUN'
('eats'|'drinks'|'hunts')                 return 'VERB'
"."                                       return 'DOT'
<<EOF>>                                   return 'EOF'

/lex

%start SENTENCE

%% /* language grammar */

SENTENCE: EOF
        { console.log("Provide text file to translate."); return $1; }
    | SUBJECT PREDICATE DOT EOF
      {return {'subject':$1, 'predicate':$2, 'fullstop':$3};}
    | SUBJECT PREDICATE OBJECT DOT EOF
      {return {'subject':$1, 'predicate':$2, 'object':$3, 'fullstop':$4};}
    ;
SUBJECT: NOUN
        {$$ = {'noun':$1}}
      | PRONOUN
        {$$ = {'pronoun':$1}}
      ;
PREDICATE: VERB
        {$$ = {'verb':$1}}
        ;
OBJECT: NOUN
        {$$ = {'noun':$1}}
      | PRONOUN
        {$$ = {'pronoun':$1.toLowerCase()}}
      ;
NOUN: PROPER
      {$$ = {'proper':$1}}
    | COMMON
      {$$ = {'common':$1}}
    ;
