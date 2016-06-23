/* description: Parses and executes english statements. */

/* lexical grammar */
%lex
%%

\s+                                      /* skip whitespace */
('Oggy'|'Tom'|'Vodqa')                    return 'PROPER'
('Lion'|'Deer'|'Fish')                    return 'COMMON'
('He'|'She'|'It')                         return 'PRONOUN'
('eats'|'drinks'|'hunts')                 return 'VERB'
"."                                       return 'FULLSTOP'
<<EOF>>                                   return 'EOF'

/lex

%start PARAGRAPH

%% /* language grammar */

PARAGRAPH: EOF
        { console.log("Provide text file to translate."); return $1; }
      | SENTENCES EOF
        {return $1;}
      ;
SENTENCES: SENTENCE
          {$$ = [{'sentence':$1}];}
        | SENTENCES SENTENCE
          {$$ = $1.concat([{'sentence':$2}]);}
        ;
SENTENCE: SUBJECT PREDICATE FULLSTOP
        {$$ = [{'subject':$1, 'predicate':$2, 'fullstop':$3}];}
      | SUBJECT PREDICATE OBJECT FULLSTOP
        {$$ = [{'subject':$1, 'predicate':$2, 'object':$3, 'fullstop':$4}];}
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
