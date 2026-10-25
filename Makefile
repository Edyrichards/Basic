.PHONY: install test typecheck fixtures eval eval-haiku eval-sonnet clean

install:
	npm install

test:
	npm test

typecheck:
	npm run typecheck

fixtures:
	npm run fixtures

# Full eval on the committed fixture set. Needs ANTHROPIC_API_KEY.
eval:
	npm run eval -- --fixtures fixtures/synthetic

eval-haiku:
	LEDGER_MODEL=claude-haiku-5-5 npm run eval -- --fixtures fixtures/synthetic

eval-sonnet:
	LEDGER_MODEL=claude-sonnet-5-5 npm run eval -- --fixtures fixtures/synthetic

clean:
	rm -rf dist eval/out *.db
