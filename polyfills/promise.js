
// refer this link for understanding https://brunoscopelliti.com/lets-write-a-promise-polyfill/
const [
    FULFILLED,
    REJECTED,
    PENDING
  ] = [true, false, undefined];
  
class Promifill {

    // getter as these fields are not directly exposed
    get state () { 
        return PENDING;
    }
    
    get value () {
        return undefined;
    }

    get settled () {
        return false;
    }

    constructor (executor) {
        
        if (typeof executor != "function") {
          throw new TypeError(`Promise resolver must be a function`);
        }

        defineProperty(this, "observers", []);

        // creating instance fields, which are not enumerable, not configurable, and not writable.
        // todo check for the above comment
        const defineProperty = (target, propName, propValue) => {
            Object.defineProperty(target, propName, { value: propValue });
        };

        const secret = [];
        const resolve = (value, bypassKey) => {
            if (this.settled && bypassKey !== secret) {
                return;
            }
            defineProperty(this, "settled", true);
            const then_ = value && value.then;
            const thenable = typeof then_ == "function";
            if (thenable && value.state === PENDING) {
                then_.call(
                    value,
                    (v) =>
                      resolve(v, secret),
                    (r) =>
                      reject(r, secret)
                );
              } else {
                defineProperty(this, "value",
                  thenable
                    ? value.value
                    : value);
                defineProperty(this, "state",
                  thenable
                    ? value.state
                    : FULFILLED);
            }
        };

        const reject = (reason, bypassKey) => {
            if (this.settled && bypassKey !== secret) {
                return;
            }

            defineProperty(this, "settled", true);
            defineProperty(this, "value", reason);
            defineProperty(this, "state", REJECTED);
        };

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then (onfulfill, onreject) {
        return new this.constructor((resolve, reject) => {
            const internalOnfulfill = (value) => {
                try {
                    resolve(
                    typeof onfulfill == "function"
                        ? onfulfill(value)
                        : value
                    );
                } catch (error) {
                    reject(error);
                }
            };
      
            const internalOnreject = (reason) => {
                try {
                    if (typeof onreject == "function") {
                    resolve(onreject(reason));
                    } else {
                    reject(reason);
                    }
                } catch (error) {
                    reject(error);
                }
            }
      
          this.observers.push({
            onfulfill: internalOnfulfill,
            onreject: internalOnreject
          });
        });
    }
    
}